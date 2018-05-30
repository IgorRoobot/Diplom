
python_home = '/var/www/i-dyplom/public_html/venv'

import sys
import site

# Calculate path to site-packages directory.

python_version = '.'.join(map(str, sys.version_info[:2]))
site_packages = python_home + '/lib/python%s/site-packages' % python_version

# Add the site-packages directory.

site.addsitedir(site_packages)


import sys
import os.path

sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

sys.path.append('/var/www/i-dyplom/public_html/venv/lib/python3.5')
sys.path.insert(0, '/var/www/i-dyplom/public_html/i-dyplom/')

from server import app as application
