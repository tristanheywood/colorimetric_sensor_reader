rm -r sotcat_backend_dist
pyinstaller .\src\sotcat_backend\server.py --hidden-import betterproto --distpath sotcat_backend_dist
# rm -r .\build\
# rm .\server.spec
