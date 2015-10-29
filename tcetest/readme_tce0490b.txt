TC:E 0.490b patch
-----------------

fixed disappearing flags bug in CTF
fixed bomb dropping when client that follows bomb carrier disconnects
fixed glass shader that lets smoke disappear
fixed basement spawn points in snow
replaced ROE violation by spawn protection in CTF
replaced ROE violation by spawn protection for friendly in BC (0.48 like)
increased CTF respawn time to 30 seconds
fixed r_ambientscale being switched to engine default when server changed maps (resulted in much too dark player lighting)
fixed bug that kicked the player being followed if the player to be kicked was in following mode
fixed disconnect icon position
removed talk icon for dead players
fixed viewport clipping when leaning into walls
fixed incorrect fogging of northport puddle texture
fixed fogging of grenade explosion mark
tweaked corner smearing effect of mark projection
tweaked smoke grenade smoke to be fogged
added 16:9, 16:10 and 4:3 support with fixed horizontal FOV of 90 deg (controlled via cg_aspectMode or UI) 
added 4 additional common screen resolutions to UI (including 1680x1050)
reworked positioning of HUD elements depending on aspect ratio 
added functionality to use lightgrid for 2D elements 
2D sniper scope shader is now lit by lightgrid and effected by dynamic eye
lowered gun position in hip mode to appear more realistic and consistent in all modes
specops commando snipers now have helmet for better team identification
fixed wounded specops commando skins (changed from mask to no mask)
fixed error in stats routine that caused missing damage rating in scoreboard
adapted scoreboard to screenwidth
removed chatbox from intermission
added kills, deaths, suicides and team kills to scoreboard
server logfile now includes weapon names in kill logs
added optional freeaim feature in aimed and scoped mode
added freeaim switch to UI
added random off-center landzone of the aiming vector in tac mode 
FOV in aimed mode now depends on weapon class
changed map location for northport to Liverpool
added cg_aspectFOVMode to UI
added experimental ballistic bullet tracing (currently deacticated)
in-game server browser now filters only obj_ maps (version 049+)
removed high explosive grenades from Recon class
reorganized grenade loadouts
decreased SMG damage by 10%
halved maximum accuracy for sidearms and machine pistols
increased Mac10 recoil by 30%
fixed scripting error in railhouse demolition that did not indicate bombed spots
