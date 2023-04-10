// Digit precision across outputs; no intermediate rounding is performed
const digit_precision = 6;

// Selects the name of the result based on the operation
const results = {"add": "sum", "subtract": "difference"};

// Hardcoded conversion rates from a given unit to meters
const length_conversions = {"micrometers": 1e-6, "millimeters": 1e-3, "centimeters": 1e-2, "meters": 1, "kilometers": 1e3, 
"inches": 0.0254, "feet": 0.3048, "yards": 0.9144, "miles": 1609};

// Hardcoded conversion rates from a given unit to kilograms
const mass_conversions = {"micrograms": 1e-9, "milligrams": 1e-6, "grams": 1e-3, "kilograms": 1, "metric_tons": 1e3, 
"ounces": 0.02835, "pounds": 0.4536};

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

Selects the correct list of constants for the default conversion based on the unit type

Arguments
----------
value: number, numerical value representing the quantity of old_unit
old_unit: string, unit being converted from
new_unit: string, unit being converted to
unit_type: string, type of unit being converted

*/
function default_choose_unit_type(value, old_unit, new_unit, unit_type) {
    return do_conversion(value, old_unit, new_unit, unit_type_to_conversion_map[unit_type]);
}

/* 

Selects the correct list of constants for adding two quantities based on the unit type

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

Selects the correct list of constants for adding two quantities based on the unit type

Arguments
----------
value1: number, numerical value representing the quantity of unit1
value2: number, numerical value representing the quantity of unit2
unit1: string, unit in the first field
unit2: string, unit in the second field
unit_type: string, type of unit being converted

*/

function add_choose_unit_type(value1, value2, unit1, unit2, unit_type) {
    return add_values(value1, value2, unit1, unit2, unit_type_to_conversion_map[unit_type]);
}

/* 

Forces all inputs to be of number type for arithmetic

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

Forces all inputs to be of number type for arithmetic

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
/* 

Processes input for the default converion

Arguments
----------
unit_type: string, type of unit being converted

*/
function default_process_input(unit_type) {
    process_input(unit_type, "default");
    return;
}

/* 

Processes input for adding or subtracting quantities

Arguments
----------
unit_type: string, type of unit being converted

*/
function addsum_process_input(unit_type) {
    let operation = document.getElementById("operation").value;
    if (operation === "+") {
        process_input(unit_type, "add");
    } else if (operation === "-") {
        process_input(unit_type, "subtract");
    }
    return;
}

/* 

Reads input, processes data, and writes output for all operations

Arguments
----------
unit_type: string, type of unit being converted
conversion_rates: map, hardcoded conversion rates determined by the type of unit

*/
function process_input(unit_type, conversion_type) {
    if (conversion_type === "default") {
        // Retrieves values for default conversion
        let value = document.getElementById("default_lengths_input").value;
        let old_unit = document.getElementById("default_lengths1").value;
        let new_unit = document.getElementById("default_lengths2").value;

        // Force all inputs to be of type number
        [value] = force_numbers(value);

        // Performs necessary computations
        let output = default_choose_unit_type(value, old_unit, new_unit, unit_type);

        // Write output
        document.getElementById("default_lengths_output").value = round(output);
    
    } else if (conversion_type === "add" || conversion_type === "subtract") {
        // Retrieves values for addition/subtraction
        let value1 = document.getElementById("add_lengths_input1").value;
        let value2 = document.getElementById("add_lengths_input2").value;
        let unit1 = document.getElementById("add_lengths1").value;
        let unit2 = document.getElementById("add_lengths2").value;

        // Force all inputs to be of type number
        [value1, value2] = force_numbers(value1, value2);
        
        // Subtracting is equivalent to adding the additive inverse
        if (conversion_type === "subtract") { value2 *= -1; }
        
        // Performs necessary computations
        let [output1, output2] = add_choose_unit_type(value1, value2, unit1, unit2, unit_type);

        // Round outputs
        [output1, output2] = round(output1, output2);

        // Write output
        let output_line1 = `The ${results[conversion_type]} is equal to ${output1} ${unit1}.`;
        let output_line2 = `The ${results[conversion_type]} is equal to ${output2} ${unit2}.`;
        document.getElementById("add_lengths_output1").innerHTML = output_line1;
        document.getElementById("add_lengths_output2").innerHTML = output_line2;
    }
    return;
}

module.exports = {
    digit_precision,
    results,
    length_conversions,
    mass_conversions,
    unit_type_to_conversion_map,
    do_conversion,
    add_choose_unit_type,
    force_numbers,
    round,
    default_process_input,
    addsum_process_input,
    process_input
};
  