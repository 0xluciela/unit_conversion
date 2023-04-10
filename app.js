// Import functions and constants
let conversion = require('./conversion.js');
const { digit_precision, results, length_conversions, mass_conversions, unit_type_to_conversion_map } = require('./conversion.js');
let express = require('express');

// Launch express server
let app = express();
app.use(express.static('public'));

// Default conversion case
app.get('/convert/default/value/:value/old_unit/:old_unit/new_unit/:new_unit/unit_type/:unit_type', (req, res) => {
    let value = parseFloat(req.params.value);
    let old_unit = req.params.old_unit;
    let new_unit = req.params.new_unit;
    let unit_type = req.params.unit_type;

    // Call do_conversion() based on parameters passed from http request
    let output = conversion.do_conversion(value, old_unit, new_unit, unit_type_to_conversion_map[unit_type]);
    output = conversion.round(output);
    res.send(`${output}`);
});

// Addition/subtraction case
app.get('/convert/addsub/operation/:operation/value1/:value1/value2/:value2/unit1/:unit1/unit2/:unit2/unit_type/:unit_type', (req, res) => {
    let operation = req.params.operation;
    let value1 = parseFloat(req.params.value1);
    let value2 = parseFloat(req.params.value2);
    let unit1 = req.params.unit1;
    let unit2 = req.params.unit2;
    let unit_type = req.params.unit_type;

    // Subtraction is equivalent to adding the additive inverse
    if (operation === "-") { value2 *= -1; }

    // Call add_values() based on parameters passed from http request
    let [output1, output2] = conversion.add_values(value1, value2, unit1, unit2, unit_type_to_conversion_map[unit_type]);
    [output1, output2] = conversion.round(output1, output2);

    // Reset value2 in the subtraction case for easy output
    if (operation === "-") { value2 *= -1; }

    // '&' is used to separate the strings
    res.send(`${value1} ${unit1} ${operation} ${value2} ${unit2} is equal to ${output1} ${unit1}.&${value1} ${unit1} ${operation} ${value2} ${unit2} is equal to ${output2} ${unit2}.`);
});

// Listen for connections
app.listen(3000, () => {
    console.log('Server started on port 3000');
});