import { add, multiply} from './deps.ts'

console.log({add, multiply})

function totalCost(outbound: number, inbound:number, tax: number) {
  return multiply(add(outbound, inbound), tax)
}

console.log(totalCost(19, 31, 1.2));
console.log(totalCost(45, 27, 1.15));
