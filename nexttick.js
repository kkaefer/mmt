
process.nextTick(function() {
    console.warn('next tick');
});

console.warn('current tick');

process.exit();
