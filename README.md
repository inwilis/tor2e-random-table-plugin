# Random tables for TOR2e

This plugin renders random tables that are commonly used in pen-and-paper RPGs and allows to roll on them right in Obsidian note editor.
It is primarily intended to be used for **The One Ring 2e** RPG.

## General concepts

Each row of the random table is associated with a number or a range of numbers. In scope of this document we will call this number (or range) a **roll result**.

**Rolling on a table** means generating a random number and choosing a row, **roll result** of which includes this random number.

> For example:
> Let's assume that row A is associated with a **roll result** of 1, and row B is associated with a **roll result** of 2 to 4.
> If randomly generated number is 1, row A will be chosen. If randomly generated number is 2, 3 or 4, row B will be chosen.

Each random table must have a rule by which the random number is generated. Random table is considered correct, if each possible generated number can correspond
to *strictly one* row. It means, in particular, that **roll results** of different rows cannot intersect.


## Table definition

Random table is created with the code block of the following structure:

````
```tor2e-random-table
header:
  - first column
  - second column  
rows:
  - 1|Some row
  - 2|Some other row
  - 3-4|One more row
  - 5-6|Final row
```
````

Ths will render a table with two columns, named "first column" and "second column". 

"Header" section is not mandatory; if omitted, table will be rendered without header. If number of header items is less than number of columns, extra columns will be rendered without a header. Extra header items will be ignored.

Pipe symbol ("|") in a row defines a column break. There is no requirement for number of columns in each row to be equal. If one row has, for example, 4 columns, and another has 2, it will be rendered with an empty cells where columns are missing.

First column of each row **must** contain a **roll result** for this row - a number or a range of numbers. Range is expressed by two numbers separated with a dash. First number in a range **must not** be greater than the second.

**Roll results** for all rows **must** form a contiguous range of numbers. For example, defining roll results for rows as "1", "2-3" and "5-6" will result in an error, because
number 4 is not associated with any row.

## Rolling on a table

When mouse cursor is placed over the table, a hovering button appears in a left top corner. When it is clicked, plugin will roll on this table and highlight a row
that was chosen. Floating notification with the random number that was actually generated, will appear for the short time.

## Impromptu tables

Random table shown in example above will be interpreted as **impromptu table**. It means that the rule by which random number is generated will be inferred from the
roll results. Namely, random number will be chosen from the range composed of all roll results, with equal distribution of probabilities. For the table above it means
that random number will be chosen from the range between 1 and 6, inclusive.


## Feat Die tables

Feat die is a d12 die with special markings that is used in TOR2e. One such marking is "the Eye of Sauron" (used instead of 11) and another is "Gandalf Rune" (used instead of 12). Code block with `die: feat` element will be treated as feat die table. Rows of such table **must** cover the range of 1 to 12 with their roll expressions. 

Letter "G" in a first column will be interpreted as number 12, and letter "E" - as number 11. These letters will be rendered as their corresponding markings on a feat die.
(Letters "G" and "E" cannot be used in ranges).

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

Example above shows such table. If header block is omitted, and table has exactly 3 columns, it will be rendered as if headers were "Feat Die Roll", "Result" and "Description".

## Dealing with errors

When plugin is unable to parse the code block, it will render an error message instead of a table. Plugin uses following error messages:

<dl>
  <dt>Error: Random table must contain a list of rows</dt>
  <dd>Shown when "rows:" section is missing or malformed.</dd>
  <dt>Error: Row number N is empty</dt>
  <dd>Shown when row #N has no content.</dd>
  <dt>Error: Unable to parse "string" as a range. Correct range must contain two numbers, of which first must not be greater than the second.</dt>
  <dd>Shown when some range in roll result column is malformed.</dd>
  <dt>Error: Unable to parse "string" as a number.</dt>
  <dd>Shown when some string in roll result column is clearly not a range, and also cannot be interpreted as a number.</dd>
  <dt>Error: No ranges were parsed</dt>
  <dd>Shown when entire row result column contain no valid ranges or numbers.</dd>
  <dt>Error: Roll results for rows N and M are intersecting</dt>
  <dd>Shown when such random number exists that for which choice between rows N and M is ambiguous.</dd>
  <dt>Error: Roll results are not covering whole range of possible results</dt>
  <dd>Shown when such random number exists that no row can be chosen for it.</dd>
</dl>
