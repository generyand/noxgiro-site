export const scrollbarStyles = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(155, 155, 155, 0.5)',
    borderRadius: '20px',
    border: 'transparent',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(155, 155, 155, 0.7)',
  },
};
