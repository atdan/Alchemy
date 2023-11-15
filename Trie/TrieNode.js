class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false; // This property should indicate if the node is the end of a word.
    }
}

module.exports = TrieNode;
