import sys
import traceback

log = open('test_out.txt', 'w', encoding='utf-8')

def out(msg):
    log.write(msg + '\n')
    log.flush()

out("Step 1: starting")

try:
    import requests
    out("Step 2: requests imported OK")
except Exception as e:
    out(f"Step 2 FAILED: {e}")
    log.close(); sys.exit(1)

try:
    from flask_frozen import Freezer
    out("Step 3: flask_frozen imported OK")
except Exception as e:
    out(f"Step 3 FAILED: {e}")
    log.close(); sys.exit(1)

try:
    from app import app
    out("Step 4: app imported OK")
except Exception as e:
    out(f"Step 4 FAILED: {e}")
    log.close(); sys.exit(1)

try:
    app.config['FREEZER_DESTINATION'] = 'docs'
    app.config['FREEZER_BASE_URL'] = 'http://localhost/'
    app.config['FREEZER_REMOVE_EXTRA_FILES'] = True
    app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
    freezer = Freezer(app)
    out("Step 5: Freezer created OK")
except Exception as e:
    out(f"Step 5 FAILED: {e}")
    log.close(); sys.exit(1)

try:
    out("Step 6: calling freezer.freeze() ...")
    log.flush()
    freezer.freeze()
    out("Step 6: freeze() completed successfully!")
except Exception as e:
    out(f"Step 6 FAILED: {e}")
    out(traceback.format_exc())

log.close()
