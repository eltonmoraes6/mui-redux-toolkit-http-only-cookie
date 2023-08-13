const genderFormat = new RegExp(/^(?:m|M|male|Male|f|F|female|Female)$/gm);

const nameFormat = new RegExp(
  /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/
);

const mailformat = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passFormat = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
);

const phoneFormat = new RegExp(/^(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/);

export { genderFormat, mailformat, nameFormat, passFormat, phoneFormat };
