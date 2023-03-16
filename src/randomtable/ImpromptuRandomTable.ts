import {RandomTable} from "./RandomTable";
import {Rows} from "./Rows";
import {ensureArraySize} from "./utils";

export class ImpromptuRandomTable extends RandomTable {

    constructor(containerEl: HTMLElement, header: string[], rows: Rows) {
        super(containerEl,
            header.length > 0
                ? ensureArraySize(header, rows.columnsCount)
                : [],
            rows,
            null)
    }

    renderBody(tbody: HTMLTableSectionElement) {
        this.rows.rows.forEach((row, row_index) => {
            const tr = tbody.createEl("tr", {attr: {"range": this.rollResults.ranges[row_index].toString()}})
            row.forEach((cell) => tr.createEl("td", {text: cell}))
        })
    }

}
