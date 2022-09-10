var GeekNft = artifacts.require("GeekNft");
var GeekNftMarketPlace = artifacts.require("GeekNftMarketPlace");

module.exports = async function(deployer) {
  await deployer.deploy(GeekNftMarketPlace);
  const marketplace = await GeekNftMarketPlace.deployed();
  await deployer.deploy(GeekNft, marketplace.address, "geek nft", "GEEKT");
}