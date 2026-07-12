from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 8069), PreviewHandler)
    print("EcoSphere preview running at http://localhost:8069/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    run()

