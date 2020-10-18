const currentYear = new Date().getFullYear();
const previousYears = [];

// eslint-disable-next-line no-sequences
for (let j = 50; j >= 1; j -= 1) {
  previousYears.push({ value: currentYear - j, label: currentYear - j });
}

export default [...previousYears, { value: currentYear, label: currentYear }];
