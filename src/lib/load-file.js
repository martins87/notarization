const callbackRead = (reader, file, event, callbackProgress, callbackFinal) => {
  callbackProgress(event.target.result);
  if (reader.offset + reader.size >= file.size) {
    callbackFinal();
  }
};

export const loadFile = (file, callbackProgress, callbackFinal) => {
  var chunkSize = 1024 * 1024; // bytes
  var offset = 0;
  var size = chunkSize;
  var partial;
  var index = 0;

  if (file.size === 0) {
    callbackFinal();
  }
  while (offset < file.size) {
    partial = file.slice(offset, offset + size);
    var reader = new FileReader();
    reader.size = chunkSize;
    reader.offset = offset;
    reader.index = index;
    reader.onload = function (event) {
      callbackRead(this, file, event, callbackProgress, callbackFinal);
    };
    reader.readAsArrayBuffer(partial);
    offset += chunkSize;
    index += 1;
  }
};
