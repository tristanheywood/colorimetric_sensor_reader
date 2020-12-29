rm -r sotcat_backend_dist
pyinstaller .\src\sotcat_backend\server.py --distpath sotcat_backend_dist
# rm -r .\build\
# rm .\server.spec
