from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def run(port=8070):
    server = ThreadingHTTPServer(("127.0.0.1", port), PreviewHandler)
    print(f"EcoSphere preview running at http://localhost:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    run()

