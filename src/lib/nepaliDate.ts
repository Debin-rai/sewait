import NepaliDate from 'nepali-date-converter';

const nepaliMonths = [
    "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"
];

const nepaliDays = [
    "आइतबार", "सोमवार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"
];

const nepaliNumbers: { [key: string]: string } = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
};

export function toNepaliNumber(num: number | string): string {
    return num.toString().split('').map(digit => nepaliNumbers[digit] || digit).join('');
}

export function getCurrentNepaliDate() {
    const now = new Date();
    const npDate = new NepaliDate(now);

    const year = npDate.getYear();
    const month = npDate.getMonth(); // 0-indexed
    const day = npDate.getDate();
    const dayOfWeek = now.getDay();

    return {
        year: toNepaliNumber(year),
        month: nepaliMonths[month],
        day: toNepaliNumber(day),
        dayName: nepaliDays[dayOfWeek],
        fullDate: `${toNepaliNumber(year)} ${nepaliMonths[month]} ${toNepaliNumber(day)}`
    };
}
