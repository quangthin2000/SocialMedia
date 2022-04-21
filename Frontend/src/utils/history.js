import { createBrowserHistory } from "history";

const history = createBrowserHistory();
history.listen(() => window.scroll(0, 0));
export default history;
