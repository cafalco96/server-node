import { assert } from 'chai';
const addValue = (num1, num2) => {
  return num1 + num2;
};

describe('Pruebas unitarias', () => {
  it('Esperamos un 10', ()=> {
    let data = addValue(5, 5);
    assert.equal(data, 10);
  })
});