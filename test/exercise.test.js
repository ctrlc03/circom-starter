const hre = require("hardhat");
const { assert, expect } = require("chai");

describe("Exercise circuit", () => {
  let circuit;

  const sampleInput = {
      "in": [1, 2],
      "res": 1
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("exercise");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has the correct output", async () => {
    const expected = { out: 1 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });

  it('passes input tests', async () => {
    sampleInput.in = [BigInt("9007199254740991"), BigInt("9007199254740992")]
    const expected = { out: 1 }
    let witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)

    sampleInput.in = [BigInt("10944121435919637611123202872628637544274182200208017171849102093287904247807"), BigInt("10944121435919637611123202872628637544274182200208017171849102093287904247808")]
    witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)

    sampleInput.in = [BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495615"), BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")]
    witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)

    sampleInput.in = [BigInt("0"), BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495618")]
    witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)
  })

  it('fails', async () => {
    const expected = { out: 1 }
    let e = null;

    console.log(BigInt(2) ** BigInt(252))

    try {
      sampleInput.in = [0, BigInt("7237005577332262213973186563042994240829374041602535252466099000494570602496")]
      witness = await circuit.calculateWitness(sampleInput, sanityCheck)
      await circuit.assertOut(witness, expected)

    } catch (error) {
      e = error;
    }

    expect(e).to.not.be.null
    e = null

    try {
      sampleInput.in = [BigInt("0"), BigInt("10944121435919637611123202872628637544274182200208017171849102093287904247808")]
      witness = await circuit.calculateWitness(sampleInput, sanityCheck)
      await circuit.assertOut(witness, expected)
    } catch (error) {
      e = error
    }

    expect(e).to.not.be.null
    e = null

    try {
      sampleInput.in = [BigInt("10944121435919637611123202872628637544274182200208017171849102093287904247808"), BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495618")]
      witness = await circuit.calculateWitness(sampleInput, sanityCheck)
      await circuit.assertOut(witness, expected)
    } catch (error) {
      e = error
    }

    expect(e).to.not.be.null
  })

  it ('output is 1 if numbers are the same', async () => {
    sampleInput.in = [2, 2]
    sampleInput.res = 1
    const expected = { out: 1}
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)
  })

});