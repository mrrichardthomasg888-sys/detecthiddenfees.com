<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; padding: 20px; background: #f9f9f9; }
          .container { max-width: 800px; margin: 0 auto; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
          th { background: #1a1a1a; color: #fff; font-weight: 600; }
          a { color: #0066cc; text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .count { margin-bottom: 15px; color: #666; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Site Map Index</h2>
          <div class="count">Total URLs found: <xsl:value-of select="count(s:urlset/s:url)"/></div>
          <table>
            <tr>
              <th>URL</th>
              <th>Priority</th>
            </tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td>
                  <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                </td>
                <td><xsl:value-of select="s:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
