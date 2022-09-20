const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 4000;

app.use(bodyParser.json())

const UnitTypes = {
    NPC_KOBOLD: 'kobold',
    CHARACTER_FIGHTER: 'fighter'
}

const mockedUnits  = [
    {
        id: '0',
        type: UnitTypes.NPC_KOBOLD,
        x: 18,
        y: 7
    },
    {
        id: '1',
        type: UnitTypes.NPC_KOBOLD,
        x: 18,
        y: 6
    },
    {
        id: '2',
        type: UnitTypes.NPC_KOBOLD,
        x: 19,
        y: 6
    },
    {
        id: '3',
        type: UnitTypes.CHARACTER_FIGHTER,
        x: 16,
        y: 2
    }
];


app.get('/units', (req, res) => {
    res.send(JSON.stringify(mockedUnits));
})

app.get('/units/movement/cells', (req, res) => {
    const { id } = req.query;
    const unit = mockedUnits.find(u => u.id === id);
    if(!unit) {
        res.send(JSON.stringify({
            cells: []
        }));
        return;
    }
    const cells = [];
    for(let i = -6; i <= 6; ++i){
        for(let j = -6; j <= 6; ++j){
            const x = (unit.x + i);
            const y = (unit.y + j);
            if(x >= 0 && y >= 0 && x <= 28 && y <= 28){
                cells.push([x, y]);
            }
        }
    }
    res.send(JSON.stringify({
        cells
    }));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
