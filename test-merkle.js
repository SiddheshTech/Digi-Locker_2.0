import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const leaves = ['a', 'b', 'c'].map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getHexRoot();

console.log('Root:', root);

const leaf = keccak256('a');
const proof = tree.getHexProof(leaf);
const verified = tree.verify(proof, leaf, root);

console.log('Verified:', verified);

// Test with strings directly
const tree2 = new MerkleTree(['a', 'b', 'c'], keccak256, { sortPairs: true });
const root2 = tree2.getHexRoot();
console.log('Root2:', root2);
console.log('Roots match?', root === root2);
