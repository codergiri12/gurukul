import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const File = ({file,className}) => {

  const openInNewTab = (link) => {
    window.open(link, '_blank', 'noreferrer');
  };

  return (
    <div
      className={` hover:bg-gray-200 flex items-center cursor-pointer border border-2 border-gray-300 w-1/3 h-12 rounded-lg	${className}`}
      onClick={() => {
        openInNewTab(process.env.REACT_APP_RAPID_API_FILE_URL + "/" + file.fileName);
      }}
    >
      <div className="border-r-2 border-gray-300 h-full flex items-center w-12 justify-center text-blue-400">
        <InsertDriveFileIcon fontSize="large" />
      </div>
      <div className="pl-4">
        {file.originalName}
      </div>
    </div>
  )
}

export default File