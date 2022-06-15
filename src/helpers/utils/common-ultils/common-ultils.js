export const formatNotes = (notes, expectLength = 100) => {
    if (notes && notes.length > expectLength) return notes.substring(0, expectLength) + '...';
    if (notes) return notes;
    return '';
}