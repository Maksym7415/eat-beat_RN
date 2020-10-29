const r4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
const UID = r4() + r4() + "-" + r4() + r4();
export default UID;
