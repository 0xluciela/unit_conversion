// Digit precision across outputs; no intermediate rounding is performed
const digit_precision = 5;

// Selects the name of the result based on the operation
const results = {"+": "sum", "-": "difference"};

// Hardcoded conversion rates from a given unit to meters
const length_conversions = {"inches": 0.0254, "feet": 0.3048, "yards": 0.9144, "miles": 1609.3,
"micrometers": 1e-6, "millimeters": 1e-3, "centimeters": 1e-2, "meters": 1, "kilometers": 1e3};

// Hardcoded conversion rates from a given unit to kilograms
const mass_conversions = {"ounces": 0.02835, "pounds": 0.4536, "US tons": 907.19,
"micrograms": 1e-9, "milligrams": 1e-6, "grams": 1e-3, "kilograms": 1, "metric tons": 1e3}; 


// Selects the conversion map based on the unit type
const unit_type_to_conversion_map = {"length": length_conversions, "mass": mass_conversions};

/* 

Performs conversion from one unit to another

Arguments
----------
value: number, numerical value representing the quantity of old_unit
old_unit: string, unit being converted from
new_unit: string, unit being converted to
conversion_rates: map, hardcoded conversion rates determined by the type of unit

*/
function do_conversion(value, old_unit, new_unit, conversion_rates) {
    // Converting from unit B to unit A can be found by multiplying the reciprocal of the conversion rate from A to B
    let conversion_factor = conversion_rates[old_unit] / conversion_rates[new_unit];
    return value * conversion_factor;
}

/* 

Adds two quantities with potentially differing units

Arguments
----------
value1: number, numerical value representing the quantity of unit1
value2: number, numerical value representing the quantity of unit2
unit1: string, unit in the first field
unit2: string, unit in the second field
conversion_rates: map, hardcoded conversion rates determined by the type of unit

*/
function add_values(value1, value2, unit1, unit2, conversion_rates) {
    // Sum of both quantities in the first unit
    let unit1_sum = value1 + do_conversion(value2, unit2, unit1, conversion_rates)

    // Sum of both quantities in the second unit
    let unit2_sum = value2 + do_conversion(value1, unit1, unit2, conversion_rates)

    return [unit1_sum, unit2_sum];
}

/* 

Debug function; forces all inputs to be of number type for arithmetic

Arguments
----------
nums: map, containing the values to be converted

*/
function force_numbers(...nums) {
    for (let i=0; i < nums.length; i++) {
        nums[i] = Number(nums[i]);
    }
    return nums;
}

/* 

Rounds all inputs to the specified degree of precision

Arguments
----------
nums: map, containing the values to be converted

*/
function round(...nums) {
    for (let i=0; i < nums.length; i++) {
        nums[i] = nums[i].toPrecision(digit_precision);
    }
    return nums;
}

module.exports = {
    digit_precision,
    results,
    length_conversions,
    mass_conversions,
    unit_type_to_conversion_map,
    add_values,
    do_conversion,
    force_numbers,
    round,
};
  