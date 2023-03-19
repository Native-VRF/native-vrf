import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const getAddressPath = (networkName: string) =>
  path.join(__dirname, `/../addressList/${networkName}.json`);

const getAddressList = async (
  networkName: string
): Promise<Record<string, string>> => {
  const addressPath = getAddressPath(networkName);
  try {
    const data = await promisify(fs.readFile)(addressPath);
    return JSON.parse(data.toString());
  } catch (e) {
    return {};
  }
};

const saveAddresses = async (
  networkName: string,
  newAddrList: Record<string, string>
) => {
  const addressPath = getAddressPath(networkName);
  const addressList = await getAddressList(networkName);

  const pathArr = addressPath.split("/");
  const dirPath = [...pathArr].slice(0, pathArr.length - 1).join("/");

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  return fs.writeFileSync(
    addressPath,
    JSON.stringify({
      ...addressList,
      ...newAddrList,
    })
  );
};

export default {
  getAddressPath,
  getAddressList,
  saveAddresses,
};
