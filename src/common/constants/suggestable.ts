// don't change the string value. tables already use this id to detect suggestable sections
export const SUGGESTABLE_ATTR_NAME = 'suggestable_section_id';

// it is stored on the table
export const LAST_BIGGEST_ID_ATTR_NAME = 'last_biggest_suggestable_id';

// decision data on how to mark text to have suggestable sections
export const SUGGESTABLE_SECTION_DECISIONS_INFO = [
  {
    isSuggestable: (content: string) =>
      ['<table ', '<table>'].some(tableDetectorStr => content.includes(tableDetectorStr)), // decide if content has suggestable sections
    targets_selector: (doc: Document) => {
      // we want to select cell elems that are not children of another cell element
      const all_cell_elems = Array.from(doc.querySelectorAll<HTMLTableCellElement>('td, th')); // selecting all cell elems
      const cell_elems_inside_cell = Array.from(
        doc.querySelectorAll<HTMLTableCellElement>('td td, td th, th td, th th')
      ); // selecting all cell elems that are children of cell elems

      return all_cell_elems.filter(td_elem => !cell_elems_inside_cell.includes(td_elem)); // removing nested td elems
    },
    parents_selector: (doc: Document) => {
      // we want to select tables  that are not children of another table
      const all_tables = Array.from(doc.querySelectorAll<HTMLTableCellElement>('table')); // selecting all tables
      const nested_tables = Array.from(doc.querySelectorAll<HTMLTableCellElement>('table table')); // selecting all tables that are children of table

      return all_tables.filter(table => !nested_tables.includes(table)); // removing nested tables
    }
  }
] as const;
