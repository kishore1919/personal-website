import { describe, expect, it } from 'vitest';

const createDate = (
	props: Readonly<{
		date: Date;
		offset: Readonly<{
			years?: number;
			months?: number;
			days?: number;
			hours?: number;
			minutes?: number;
			seconds?: number;
			milliseconds?: number;
		}>;
	}>
) => {
	return new Date(
		props.date.getFullYear() + (props.offset.years ?? 0),
		props.date.getMonth() + (props.offset.months ?? 0),
		props.date.getDate() + (props.offset.days ?? 0),
		props.date.getHours() + (props.offset.hours ?? 0),
		props.date.getMinutes() + (props.offset.minutes ?? 0),
		props.date.getSeconds() + (props.offset.seconds ?? 0),
		props.date.getMilliseconds() + (props.offset.milliseconds ?? 0)
	);
};

describe('date-wrapper-service', () => {
	it('should return the correct date', () => {
		const expectedDate = new Date('2021-01-01');
		const date = createDate({ date: expectedDate, offset: {} });
		expect(date).toStrictEqual(expectedDate);
	});

	it.each([2, -2, 0])(
		'should return date specified year offset of %i',
		(yearsOffset) => {
			const date = createDate({
				date: new Date(2022, 12, 30),
				offset: { years: yearsOffset },
			});

			expect(date).toStrictEqual(new Date(2022 + yearsOffset, 12, 30));
		}
	);

	it.each([2, -2, 0, 100])(
		'should return date specified month offset of %i',
		(monthsOffset) => {
			const date = createDate({
				date: new Date(2022, 12, 30),
				offset: { months: monthsOffset },
			});

			expect(date).toStrictEqual(new Date(2022, 12 + monthsOffset, 30));
		}
	);
});
