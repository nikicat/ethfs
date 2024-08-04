import { expect } from "chai"
import hre from "hardhat"
const { ethers } = hre
import { ChunkStorage } from "../typechain-types/index.ts"

describe("ChunkStorage contract", function () {
  let storage: ChunkStorage;

  beforeEach(async () => {
    storage = await hre.ethers.deployContract("ChunkStorage")
    await storage.waitForDeployment()
    //await storage.initialize()
  })

  it("Should return string asdzxc", async () => {
    expect(await storage.getdata()).to.equal("asdzxc")
  })

  it("Should revert irevert", async () => {
    await expect(storage.irevert(true)).reverted
  })

  it("Should not revert with false", async () => {
    await expect(storage.irevert(false)).not.reverted
  })

  it("Should emit Test in mysuperfunc", async () => {
    await expect(storage.mysuperfunc()).emit(storage, "Test")
  })

  it("Should emit chunk in save", async () => {
    await expect(storage.save(ethers.randomBytes(9))).emit(storage, "Chunk")
  })

  it("Should read chunk data after emitting", async () => {
    const data = ethers.randomBytes(90)
    await storage.save(data)
    const chunks = await storage.queryFilter(storage.filters.Chunk(null))
    expect(chunks, "chunks not empty").not.empty
    expect(chunks[0].args[0].hash, "chunk hash is correct").equal(ethers.keccak256(data))
    expect(chunks[0].args[1], "chunk is equal to input").equal(ethers.hexlify(data))
  })

  it("Should read chunk by hash after saving", async () => {
    const data = ethers.randomBytes(90)
    await storage.save(data)
    const hash = ethers.keccak256(data)
    const filter = storage.filters.Chunk()
    const dFilter = await filter.getTopicFilter()
    const logs = await ethers.provider.getLogs({
      address: await storage.getAddress(),
      topics: [dFilter[0], hash],
    })
    expect(logs, "exactly one chunk").length(1)
    const ddata = storage.interface.decodeEventLog(storage.filters.Chunk().fragment, logs[0].data)
    expect(ddata[1], "chunk is equal to input").equal(ethers.hexlify(data))
  })
})
