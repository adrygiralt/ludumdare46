const is_key_down = (() => {
    const state = {};
    //window.addEventListener('keyup', (e) => console.log(e.key));
    window.addEventListener('keyup', (e) => state[e.key] = false);
    window.addEventListener('keydown', (e) => state[e.key] = true);

    return (key) => state.hasOwnProperty(key) && state[key] || false;
})();
