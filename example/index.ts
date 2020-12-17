import App from "./App";

export default function bootstrap() {
    const startup = new App();
    startup.run(5001);
}