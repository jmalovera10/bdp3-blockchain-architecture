pragma solidity ^0.8.0;

contract LemonadeStand {
    address owner;

    uint256 skuCount;

    enum State {
        ForSale,
        Sold,
        Shipped
    }

    struct Item {
        string name;
        uint256 sku;
        uint256 price;
        State state;
        address seller;
        address buyer;
    }

    mapping(uint256 => Item) items;

    event ForSale(uint256 skuCount);

    event Sold(uint256 sku);

    event Shipped(uint256 sku);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier verifyCaller(address _caller) {
        require(msg.sender == _caller);
        _;
    }

    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price);
        _;
    }

    modifier checkValue(uint256 _sku) {
        _;
        uint256 _price = items[_sku].price;
        uint256 amountToRefund = msg.value - _price;
        payable(msg.sender).transfer(amountToRefund);
    }

    modifier forSale(uint256 _sku) {
        require(items[_sku].state == State.ForSale);
        _;
    }

    modifier sold(uint256 _sku) {
        require(items[_sku].state == State.Sold);
        _;
    }

    constructor(address _owner) {
        owner = _owner;
        skuCount = 0;
    }

    function addItem(string memory _name, uint256 _price) public onlyOwner {
        skuCount++;

        emit ForSale(skuCount);
        items[skuCount] = Item({
            name: _name,
            sku: skuCount,
            price: _price,
            state: State.ForSale,
            seller: msg.sender,
            buyer: address(0)
        });
    }

    function buyItem(uint256 sku)
        public
        payable
        forSale(sku)
        paidEnough(items[sku].price)
        checkValue(sku)
    {
        items[sku].buyer = msg.sender;
        items[sku].state = State.Sold;
        payable(items[sku].seller).transfer(msg.value);
        emit Sold(sku);
    }

    function shipItem(uint256 sku)
        public
        payable
        sold(sku)
        verifyCaller(items[sku].seller)
    {
        items[sku].state = State.Shipped;
        emit Shipped(sku);
    }

    function fetchItem(uint256 _sku)
        public
        view
        returns (
            string memory name,
            uint256 sku,
            uint256 price,
            string memory stateIs,
            address seller,
            address buyer
        )
    {
        name = items[_sku].name;
        sku = items[_sku].sku;
        price = items[_sku].price;
        uint256 state = uint256(items[_sku].state);
        if (state == 0) {
            stateIs = "For Sale";
        } else if (state == 1) {
            stateIs = "Sold";
        } else {
            stateIs = "Shipped";
        }
        seller = items[_sku].seller;
        buyer = items[_sku].buyer;
    }
}
