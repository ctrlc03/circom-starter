pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/mux1.circom";

// Circuit to determine whether a list is in ascending order or not
template Example (n) {
    // the input array of length n
    signal input in[n];

    // the public input of the expected result
    signal input res;

    // the output of the circuit 1 | 0
    signal output out;

    // list of components for comparison
    component greaterEqThen[n-1];

    // tmp var
    var selector = 1;

    // Loop through n - 1 elements and compare current with next
    for (var i = 0; i < n - 1; i++) {
        greaterEqThen[i] = GreaterEqThan(252);
        greaterEqThen[i].in[0] <== in[i+1];
        greaterEqThen[i].in[1] <== in[i];
        selector = greaterEqThen[i].out * selector;
    }

    // I guess thisnis not really needed
    // but here to remind me how to use it
    component mux1 = Mux1();
    mux1.c[0] <== 0;
    mux1.c[1] <== 1;
    mux1.s <== selector;

    out <== mux1.out;
    out === res;
}

component main { public [ res ] } = Example(2);