import BigNumber from "bignumber.js";

export const convertToWei = (val: any) => {
	let x: any = new BigNumber(val);
	x = x.multipliedBy(1e18);
	return x.toFixed(0);
};

export const convertFromWei = (val: any) => {
	let x: any = new BigNumber(val);
	x = x.multipliedBy(1e-18);
	return x.toFixed(0);
};