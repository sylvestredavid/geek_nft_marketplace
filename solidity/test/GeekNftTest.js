const GeekNft = artifacts.require("GeekNft")

contract("GeekNft", (accounts) => {
    it("mint 1 token with first account save it with owner was first account", async () => {
        const geekNftInstance = await GeekNft.deployed();
        await geekNftInstance.mint("dummy", {from: accounts[0]})
        const owner = await geekNftInstance.ownerOf.call(1)

        assert.equal(owner, accounts[0], "the owner should be " + accounts[0]);
    });
    it("transfer token #1 from first account to second account save it with owner was second account", async () => {
        const geekNftInstance = await GeekNft.deployed();
        await geekNftInstance.transferFrom(accounts[0], accounts[1], 1, {from: accounts[0]})
        const owner = await geekNftInstance.ownerOf.call(1)

        assert.equal(owner, accounts[1], "the owner should be " + accounts[1]);
    });
    it("should not transfert token if sender isn't the owner", async () => {
        const geekNftInstance = await GeekNft.deployed();
        try {
            await geekNftInstance.transferFrom(accounts[0], accounts[0], 1, {from: accounts[0]})
            assert.fail("The transaction should have thrown an error");
        } catch(err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
        const owner = await geekNftInstance.ownerOf.call(1)
        assert.equal(owner, accounts[1], "the owner should be " + accounts[1]);
    });
})