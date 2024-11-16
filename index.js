let logifyerStartTime;
function logifyer() {
    if (!logifyerStartTime) { logifyerStartTime = Date.now(); }
    return function log(...args) {
        const currentTime = Date.now();
        const elapsedMs = currentTime - logifyerStartTime;
        const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
        const stackLine = new Error().stack.split("\n")[2]?.trim() || "";
        const lineInfo = stackLine.match(/([^/\\]+:\d+:\d+)/)?.[1] || "unknown source";
        const lastArg = args[args.length - 1];
        const elapsedTime = hours > 0 ? `${hours}h.${minutes}m.${seconds}s` : minutes > 0 ? `${minutes}m.${seconds}s` : `${seconds}s`;
        const prefix = `[ ${elapsedTime} ] ( ${lineInfo} ):`;
        if (lastArg instanceof Error) {
            console.error(prefix, ...args);
        } else {
            console.log(prefix, ...args);
        }
    };
}
export default logifyer;