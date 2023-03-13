# Random tables for TOR2e

This plugin renders random tables that are commonly used in pen-and-paper RPGs and allows to roll on them right in Obsidian note editor.
It is primarily intended to be used for **The One Ring 2e** RPG.

## Flat distribution tables

Random table is created with the code block of the following structure: 

````
```tor2e-random-table
header:
  - Die Roll
  - Result  
rows:
  - 1|Some row
  - 2|Some other row
  - 3-4|One more row
  - 5-6|Final row
```
````

Ths will render a table with two columns, named "Die Roll" and "Result". "Header" section is not mandatory; if omitted, table will be rendered without header.

Pipe symbol ("|") in a row defines a column break. There is no requirement for number of columns in each row to be equal. If one row has, for example, 4 columns, and another has 2, it will be rendered with an empty cells where columns are missing.

If number of header items is less than number of columns, extra columns will be rendered without a header.

First column of each row must be a roll expression - a number that can be randomly chosen, or a range of numbers. Range is expressed by two numbers separated with a dash, without any extra spaces. 

When mouse cursor is placed over the table, a hovering button appears in a left top corner. When it is clicked, plugin will randomly choose a number between minimal and maximal values stated in roll expressions (e.g. in the example table it will be a number between 1 and 6). It will then highlight a row corresponding to that number.

Flat distribution tables has no expectation about roll expressions, except one: there can be no skipped numbers and no range intersections in row expressions (e.g. in the example above you cannot just remove row 2, or change range "3-4" to be "3-5" and therefore intersect with "5-6"). 

## Feat Die tables

Feat die is a d12 die with special markings that is used in TOR2e. One such marking is "the Eye of Sauron" (used instead of 11) and another is "Gandalf Rune" (used instead of 12). Code block with `die: feat` element and whole range of 1-12 covered by roll expressions, will be treated as feat die table.

````
```tor2e-random-table
die: feat  
rows:
  - G|Some row|some text
  - 1|Some other row|some text
  - 2-5|One more row|some text
  - 6-10|Another row|some text
  - E|Final row|some text
```
````

Example above shows such table. "G" roll expressions means "11", and "E" means "12" for this kind of table. If header block is omitted, and table has exactly 3 columns,
it will be rendered as if  headers were "Feat Die Roll", "Result" and "Description".

When mouse cursor is placed over the table, a hovering button appears in a left top corner. When it is clicked, plugin will randomly choose a number between 1 and 12. It will then highlight a row corresponding to that number.

## Dealing with errors

When plugin is unable to parse the code block, it will render an error message instead of a table. 
