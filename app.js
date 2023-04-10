let conversion = require('./conversion.js');
const { digit_precision, results, length_conversions, mass_conversions, unit_type_to_conversion_map } = require('./conversion.js');
let express = require('express');

let app = express();
app.get('/convert/milesToKilometers/input/:inputValue/type/:unitType', (req, res) => {

    const miles = parseFloat(req.params.inputValue);
    let kilos = conversion.do_conversion(miles, "miles", "kilometers", length_conversions);
    res.send(`${miles} miles is equal to ${kilos} kilometers.`);
});
  
app.get('/convert/milesToKilometers/input1/:inputValue1/type1/:unitType1/input2/:inputValue2/type2/:unitType2/targetUnit/:targetUnit', (req, res) => {
    
    const miles = parseFloat(req.params.inputValue1);
    const kilometers = miles * 1.60934;
    res.send(`${miles} miles ${kilos} kilometers is equal to ${kilos} kilometers.`);
    res.send(`${miles} miles ${kilos} kilometers is equal to ${miles} miles.`);
});
  
app.listen(3000, () => {
    console.log('Server started on port 3000');
});