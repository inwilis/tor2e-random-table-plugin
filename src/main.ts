import {Plugin} from 'obsidian';
import {registerIcons} from "./icons";
import {CODE_BLOCK_RANDOM_TABLE} from "./constants";
import {processRandomTableCodeBlock} from "./randomtable/ProcessRandomTableCodeBlock";

export default class Tor2ePlugin extends Plugin {

    async onload() {
        registerIcons();

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_RANDOM_TABLE, processRandomTableCodeBlock.bind(this))
    }

    onunload() {

    }
}
