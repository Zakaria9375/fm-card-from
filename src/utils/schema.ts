import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export const cardSchema = toTypedSchema(
	yup.object({
		cardName: yup
			.string()
			.required("Can't be blank")
			.matches(/^[A-Za-z ]+$/, "Wrong format, Letters only")
			.min(2, "Must be 2 characters long or more")
			.transform((value) => value.trim()),
		cardNumber: yup
			.string()
			.required("Can't be blank")
			.matches(/^[0-9]+$/, "Wrong format, numbers only")
			.length(16, "Must be 16 digits"),
		month: yup
			.string()
			.required("Can't be blank")
			.matches(/^[0-9]+$/, "Numbers only")
			.matches(/^(0[0-9]|1[0-2])$/, "Invalid value")
			.test("is-valid-month", "Expired card", function (value) {
				if (value !== undefined) {
					return isValidMonth(value, this.parent.year);
				}
			}),
		year: yup
			.string()
			.required("Can't be blank")
			.matches(/^[0-9]+$/, "Numbers only")
			.test("is-valid-year", "Expired card", function (value) {
				if (value !== undefined) {
					return parseInt(value) + 2000 >= currentYear;
				}
			}),
		cvc: yup
			.string()
			.required("Can't be blank")
			.matches(/^[0-9]+$/, "Numbers only")
			.length(3, "Must be 3 digits"),
	})
);
function isValidMonth(value: string, yy: string): boolean {
	if (parseInt(yy) + 2000 === currentYear) {
		return parseInt(value) >= currentMonth;
	}
	return true;
}
