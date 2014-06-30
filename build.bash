grunt better_build;
cp -avR /Users/kyle.geppert/Code/Summit\ Hill\ Software/iUltimateWebApp/dist /Users/kyle.geppert/Code/Summit\ Hill\ Software/ultimateweb/UltimateWeb/war;
rm -r /Users/kyle.geppert/Code/Summit\ Hill\ Software/ultimateweb/UltimateWeb/war/app;
mv /Users/kyle.geppert/Code/Summit\ Hill\ Software/ultimateweb/UltimateWeb/war/dist /Users/kyle.geppert/Code/Summit\ Hill\ Software/ultimateweb/UltimateWeb/war/app;
sublime /Users/kyle.geppert/Code/Summit\ Hill\ Software/ultimateweb/UltimateWeb/war/WEB-INF/appengine-web.xml;