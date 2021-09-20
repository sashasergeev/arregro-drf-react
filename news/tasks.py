from asgiref.sync import async_to_sync
from django.forms.models import model_to_dict
import requests
from celery import shared_task
from channels.layers import get_channel_layer
from .models import PriceDynamic

channel_layer = get_channel_layer()


@shared_task
def get_coins_price():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=polkadot%2Cvechain%2Csolana%2Caave%2Chuobi-token%2Cterra%2Ccosmos%2Cpancakeswap%2Csafemoon%2Cavalanche%2Cthorchain%2Calgorand%2Cwaves%2Celrond%2Cdecred%2Cyearn-finance%2Czilliqa%2Camp%2Cchiliz%2Chedera-hashgraph%2Cnear%2Cenjin-coin%2Contology%2Cnano%2Cstacks%2Cdigibyte%2Cfantom%2Cthe-graph%2Cbancor-network%2Clido-staked-ether%2Ccurve-dao-token%2Carweave%2Ciost%2Cvenus%2Charmony%2Cswissborg%2Cnexus-mutual%2Cflow%2Cankr%2C1inch%2Creserve-rights-token%2Cwazirx%2Cecomi%2Cbakeryswap%2Cenergy-web-token%2Cren%2Cquant%2Calpha-finance%2Cdent%2Cpundi-x%2Cocean-protocol%2Ciexec-rlc%2Creef-finance%2Cshabu-shabu%2Cwootrade-network%2Cband-protocol%2Calien-worlds%2Cvethor-token%2Craydium%2Cinjective-protocol%2Cneutrino-usd%2Cprometeus%2Ckyber-network-legacy%2Campleforth%2Ckava%2Cnkn%2Cdodo%2Cfun-token%2Cswipe%2Czkswap%2Corchid-protocol%2Ciotex%2Cwanchain%2Cskale%2Cton-crystal%2Corion-protocol%2Cfetch-ai%2Credfox-labs%2Ccivic%2Cakash-network%2Ctrust-wallet-token%2Cpolymath-network%2Cklever%2Cthe-sandbox%2Csingularitynet%2Celectroneum%2Ccartesi%2Cthorchain%2Cvelas%2Corigin-protocol%2Cark%2Ctravala%2Corbs%2Cceler-network%2Cultra%2Choge-finance%2Catari%2Csyntropy%2Csyscoin%2Cgamercoin%2Cnewscrypto-coin%2Ccoti%2Cellipsis%2Ckeep-network%2Cmetal%2Csonm%2Ckardiachain%2Cdivi%2Cergo%2Ctrustswap%2Ccumrocket%2Clinear%2Cpower-ledger%2Cpersistence%2Caion%2Cfiro%2Corigintrail%2Coasis-network%2Cmy-neighbor-alice%2Cdia%2Ctomochain%2Ctellor%2Csuperfarm%2Cquarkchain%2Cdao-maker%2Cchromia%2Cperpetual-protocol%2Cphala-network%2Cpaid-network%2Cirisnet%2Cparsiq%2Clukso-token%2Cevolution-finance%2Cfrax%2Ccarry%2Cramp%2Cderivadao%2Cbeam%2Crefinable%2Clto-network%2Ccrust-network%2Clitentry%2Cnominex%2Clambda%2Cakropolis%2Cenergi%2Csharetoken%2Csparkpoint%2Cunit-protocol%2Cnuls%2Cquickswap%2Cshopping-io%2Ccoinmetro%2Cmarlin%2Cthundercore%2Cdfi-money%2Cunit-protocol-duck%2Cmaps%2Cfusion%2Cefforce%2Cpivx%2Crender-token%2Crari-governance-token%2Ccertik%2Cbella-protocol%2Cbzx-protocol%2Cbeefy-finance%2Callianceblock%2Cwaultswap%2Cvesper-finance%2Cbluzelle%2Cbscpad%2Ccardstarter%2Ccream%2Crefereum%2Cterra-virtua-kolect%2Carpa-chain%2Cpnetwork%2Csmartlands%2Cmantra-dao%2Cneutrino-system-base-token%2Csentivate%2Cdsla-protocol%2Cstp-network%2Chard-protocol%2Cv-systems%2Cbifrost%2Cbridge-mutual%2Ccontentos%2Ceverest%2Cdusk-network%2Csolve-care%2Carmor%2Cfrontier%2Csmartkey%2Cauto%2Cdigitalbits%2Cfree-coin%2Cyield-app%2Capolloget-protocol%2Clgcy-network%2Cnimiq%2Ccardstack%2Crootkit%2Cdecentral-games%2Cfio-protocol%2Ckylin-network%2Cswitcheo%2Cripio-credit-network%2Cstafi%2Chackenai%2Cbepro-network%2Caergo%2Cglitch-protocol%2Cunilend-finance%2Cmetahash%2Cmcdex%2Cgochain%2Cdego-finance%2Cphoenix-global%2Caavegotchi%2Cwing-finance%2Cmorpheus-network%2Cspartan-protocol-token%2Cbitz-token%2Cdextools%2Cfrax-share%2Coccamfi%2Cconvergence%2Chopr%2Cbtu-protocol%2Cdexe%2Cte-food%2Cbanano%2Cwault%2Cjulswap%2Chelmet-insure%2Carianee%2Cunifi-protocol-dao%2Chydradx%2Caioz-network%2Cfortube%2C88mph%2Ccyberfi%2Cfinxflo%2Cgovi%2Cferrum-network%2Cdarwinia-network-native-token%2C0-exchange%2Cmoviebloc%2Cvideocoin%2Cneblio%2Crevv%2Copium%2Cphantasma%2Cdefi-for-you%2Cboson-protocol%2Cnash%2Cbtse-token%2Csentinel-protocol%2Cstake-dao%2Cgenesis-vision%2Cbip%2Crobonomics-network%2Cmorpheus-labs%2Cselfkey%2Ccallisto-network%2Cstakenet%2Capy-finance%2Ctrias-token%2Cacryptos%2Cexeedme%2Cdeapcoin%2Cjenny-metaverse-dao-token%2Cmobox%2Cplian%2Csentinel%2Ctelos%2Cpowerpool-concentrated-voting-power%2Crouter-protocol%2Csafe-haven%2Caleph-im%2Cmeasurable-data-token%2Cpolkamarkets%2Cpolylastic%2Cbenchmark-protocol%2Coceanex-token%2Ctokenclub%2Ckira-network%2Ccrypterium%2Cvfox%2Cduckdaodime%2Cdeus-finance%2Ccutcoin%2Cdecentr%2Cunifty%2Cdora-factory%2Cpendle%2Cichi%2Cunion-protocol-governance-token%2Cunmarshal%2Cblank%2Cdlp-duck-token%2Caxion%2Cidle%2Ctidal-finance%2Chord%2Cmeme%2Cbux-token%2Cconnect-financial%2Cumbrella-network%2Cupbots%2Coraichain-token%2Cinverse-finance%2Copacity%2Ccrowns%2Coxbull-tech%2Cpresearch%2Csuperbid%2Crainicorn%2Clabs-group%2Cbitberry-token%2Chorizon-protocol%2Cfoam%2Cnaos-finance%2Csparkpoint-fuel%2Cparticl%2Cdhedge-dao%2Cmultivac%2Cswftcoin%2Cgraphlinq-protocol%2Caragon-court%2Coiler%2Cxend-finance%2Clympo%2Crubic%2Covr%2Cmodefi%2Cdextf%2Crio-defi%2Cpermission-coin%2Cpoa-network%2Cunitrade%2Cxfund%2Cautonio%2Ckonomi-network%2Cpoolz-finance%2Capyswap%2Chakka-finance%2Cplotx%2Cshyft-network%2Ceffect-network%2Cgiv-token%2Cpancaketools%2Cbasis-share%2Cvexanium%2Cprcy-coin%2Cdoki-doki%2Czignaly%2Cgeeq%2Cghost%2Cdefi-yield-protocol%2Cnord-finance%2Csync-network%2Cpower-index-pool-token%2Csnowswap%2Csignata%2Clua-token%2Cbasketcoin%2Cbartertrade%2Cchronotech%2Csatt%2Cnodeseeds%2Cplaycent%2Cblind-boxes%2Coffshift%2Cmonavale%2Cidena%2Cacdx-exchange-token%2Cpaypolitan-token%2Cmywish%2Ccanyacoin%2Cpermission-coin&vs_currencies=usd"
    data = requests.get(url).json()
    prices = []
    for coin, price in data.items():
        try:
            obj = PriceDynamic.objects.get(cg_id=coin)
        except:
            continue

        if float(obj.price) > price["usd"]:
            state = "fall"
        elif float(obj.price) == price["usd"]:
            state = "same"
        elif float(obj.price) < price["usd"]:
            state = "raise"

        obj.price = str(price["usd"])
        obj.cg_id = coin
        obj.save()
        new_data = model_to_dict(obj)
        new_data.update({"name": obj.coin.name, "state": state})
        prices.append(new_data)

    async_to_sync(channel_layer.group_send)(
        "prices", {"type": "send_new_data", "text": prices}
    )
