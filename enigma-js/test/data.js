const CERT = '-----BEGIN CERTIFICATE-----\n' +
  'MIIEoTCCAwmgAwIBAgIJANEHdl0yo7CWMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNV\n' +
  'BAYTAlVTMQswCQYDVQQIDAJDQTEUMBIGA1UEBwwLU2FudGEgQ2xhcmExGjAYBgNV\n' +
  'BAoMEUludGVsIENvcnBvcmF0aW9uMTAwLgYDVQQDDCdJbnRlbCBTR1ggQXR0ZXN0\n' +
  'YXRpb24gUmVwb3J0IFNpZ25pbmcgQ0EwHhcNMTYxMTIyMDkzNjU4WhcNMjYxMTIw\n' +
  'MDkzNjU4WjB7MQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFDASBgNVBAcMC1Nh\n' +
  'bnRhIENsYXJhMRowGAYDVQQKDBFJbnRlbCBDb3Jwb3JhdGlvbjEtMCsGA1UEAwwk\n' +
  'SW50ZWwgU0dYIEF0dGVzdGF0aW9uIFJlcG9ydCBTaWduaW5nMIIBIjANBgkqhkiG\n' +
  '9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqXot4OZuphR8nudFrAFiaGxxkgma/Es/BA+t\n' +
  'beCTUR106AL1ENcWA4FX3K+E9BBL0/7X5rj5nIgX/R/1ubhkKWw9gfqPG3KeAtId\n' +
  'cv/uTO1yXv50vqaPvE1CRChvzdS/ZEBqQ5oVvLTPZ3VEicQjlytKgN9cLnxbwtuv\n' +
  'LUK7eyRPfJW/ksddOzP8VBBniolYnRCD2jrMRZ8nBM2ZWYwnXnwYeOAHV+W9tOhA\n' +
  'ImwRwKF/95yAsVwd21ryHMJBcGH70qLagZ7Ttyt++qO/6+KAXJuKwZqjRlEtSEz8\n' +
  'gZQeFfVYgcwSfo96oSMAzVr7V0L6HSDLRnpb6xxmbPdqNol4tQIDAQABo4GkMIGh\n' +
  'MB8GA1UdIwQYMBaAFHhDe3amfrzQr35CN+s1fDuHAVE8MA4GA1UdDwEB/wQEAwIG\n' +
  'wDAMBgNVHRMBAf8EAjAAMGAGA1UdHwRZMFcwVaBToFGGT2h0dHA6Ly90cnVzdGVk\n' +
  'c2VydmljZXMuaW50ZWwuY29tL2NvbnRlbnQvQ1JML1NHWC9BdHRlc3RhdGlvblJl\n' +
  'cG9ydFNpZ25pbmdDQS5jcmwwDQYJKoZIhvcNAQELBQADggGBAGcIthtcK9IVRz4r\n' +
  'Rq+ZKE+7k50/OxUsmW8aavOzKb0iCx07YQ9rzi5nU73tME2yGRLzhSViFs/LpFa9\n' +
  'lpQL6JL1aQwmDR74TxYGBAIi5f4I5TJoCCEqRHz91kpG6Uvyn2tLmnIdJbPE4vYv\n' +
  'WLrtXXfFBSSPD4Afn7+3/XUggAlc7oCTizOfbbtOFlYA4g5KcYgS1J2ZAeMQqbUd\n' +
  'ZseZCcaZZZn65tdqee8UXZlDvx0+NdO0LR+5pFy+juM0wWbu59MvzcmTXbjsi7HY\n' +
  '6zd53Yq5K244fwFHRQ8eOB0IWB+4PfM7FeAApZvlfqlKOlLcZL2uyVmzRkyR5yW7\n' +
  '2uo9mehX44CiPJ2fse9Y6eQtcfEhMPkmHXI01sN+KwPbpA39+xOsStjhP9N1Y1a2\n' +
  'tQAVo+yVgLgV2Hws73Fc0o3wC78qPEA+v2aRs/Be3ZFDgDyghc/1fgU+7C+P6kbq\n' +
  'd4poyb6IW8KCJbxfMJvkordNOgOUUxndPHEi/tb/U7uLjLOgPA==\n' +
  '-----END CERTIFICATE-----';

exports.principal = [
  '0x3078356633353161633136306365333763653066',
  '{"id":"128022255812689154718356103073112049645","timestamp":"2019-03-01T23:07:50.777250","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF2300AC3074937A9FF656135A57FEECB1D0D5F3ECB4C9B40C20E2FC3C0D70FE720F2ABF827B87FAA92E029652B07ECEB58AAF32046228DF310F29090E86B2F4359","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAABYB+Vw5ueowf+qruQGtw+5cMalOwDkFyUZvMo0u8kP5CAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAJCgMm+LdWUp+/gCuqNh0y1yXZblkdMTfCRTMaky7nJxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAweDVmMzUxYWMxNjBjZTM3Y2UwZjc4YmY2NTBkMmMxY2VkNTA5NzM2YjYAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
  CERT,
  '5cfaeab7c167e438bb0e66488e21d76737da74942d6f71325935cbb7990e7c53dddb9e9d050f40cab00e9babcda0a8a3b74ea13a979bf02872701c951115b5e68f4eb3d18ba15d0e795e94f34228b88699e48d311242f64dd503c3e2bbdfacce777127e622a58a475f10d7b24ce9a5bd9d77e685d27a544e79a722545ff2bceabe81acadbea4f4860d3bb9b31779daf9c5dcb3156e9bd3213b9c154ca93e44f6db50332c5e937d6cfdb1acf7024385ace247328b9f7bbc90e8d4699acf2a3f792df9fb50d8a96d4a8e6deb726129dc307ce203468c912ccec038bc3870bade23f9d2b59eb03bd225db15cf5ff6d0216bceb5fc4d1d2d694e15e574cff47f81fe',
  '0x79191a46ad1ed7a15e2bf64264c4b41fe6167ea887a5f7de82f52be073539730',
];

exports.workers = [
  [
    '0x9c1ac1fca5a7bff4fb7e359a9e0e40c2a430e7b3',
    '{"id":"84241718380797467261592936914776858960","timestamp":"2019-02-22T23:10:17.724838","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000700000505020401010000000000000000000008000009000000020000000000000AC76FD48B4384CD3654D1EE6BCB57F26E8F2A61A87B5133F582012B44343FA7577732608ADBA28A0AE09216374E4AC26C8215FE7BC25EFE0EF8E497A2039C80F5FF","isvEnclaveQuoteBody":"AgAAAMcKAAAHAAYAAAAAABYB+Vw5ueowf+qruQGtw+5Rv41zU/6gNsX7IWvoiJtmAgX/BP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAGjIaRoYeUlYMsheeZ9Tmzff3PAv0OXbQLBlAcoT6hZvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACcGsH8pae/9Pt+NZqeDkDCpDDnswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '23180b9ffdb7acc35f97c4c4cd9001b7e8a8d3a8c5829ea94fcced9fe1bbd8248606499cebcc7ecc6765dbde993089fcad823ca386919ad3ed7ffa20c42eca1773225227ff252024cc3579b6c125b2ab45e112925283415f3f6603ef09223de5eb72e3ebbc5d257def1541c88625e2312c9764749d34e5864df0e4d2f7f38c185e206335f286c07fdc2e16d7329a365639f3feb922c039820a21f4b28bfb7387d4afe586f9608b64f8960034254284f85563ebde48d20387f66d9c9c7470d4c67533c043316f79066c9e588af0be2d4c96f42bb0698ebf83a54e20e14246508b092da718201b17d67dfca58e8835a5f47834c84c9c9e16a376f5a00d4cf121ca',
    '0x0c84b12d9342fa41e0047ee678138a1536ffd7dca103ef7875ac96f3e1e66d1b',
  ],
  [
    '0x151d1caa3e3a1c0b31d1fd64b6d520ef610bf99c',
    '{"id":"260330838701083051288673529479828316426","timestamp":"2019-03-19T22:30:06.697866","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF203C2F08425590CC0CDEB39A99EDF4C2E50B2F97E68692FF097CF57BD73C4FC84F0726C937A9BF932B7BFAAD560703D8E0A16D955C7C5A6B02329A12A1A85B4B4","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS3Qi9cJ8ys6nTW8SBX8YyQWCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAF5K2sEOf2OEomjz4/eb5Qgsa3GXizgBu8Gzq3ewTpnhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHRyqPjocCzHR/WS21SDvYQv5nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '82927b2e83338729a0b1fdce724fd605981fda812238a8a0947e3b9433b43a749fac0b9728ba51477e9390ff38cdeac3158c8451f21d2a1c36d93f9f51265b6f6de152ec8578194f98286feb83008a7dad4b4c3fefd2df52ea9f072c870fc7f9b279c6e73009b081eec359f97d366598394485d4a2b1780abf12831a51364aa12259ace6754c7a7702a9194d2f29dce4542a250e25872afcefbd0f2fb8546ea1b176272e1faa1b3520812c581801c4aab4ae1720b5e2456eaf764145215d1c985fd5f5717e708cdea9c9ec4494185322032a53c656dce549999e3c0909af3f2b8ea6ba83a4e5d531047736c71757253cffcbf33937a2d67ac13c01e8005b158d',
    '0x2ba47259c7c3254ec10cdf76f17ac4be688ae4e2c832bd578f3c2a8365f2fb99',
  ],
  [
    '0x1bece83ac1a195cdf6ba8f99dfb9b0a7c05b4b9b',
    '{"id":"217689495608527685592965242057101499688","timestamp":"2019-03-19T22:38:02.806040","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF29F103574E871FD661097D7B844BF3F4F7973D7D639B6DA1108EB28C84AB53119C57205EB777FE0AEDD812580ECC05B7CAE4DFB314B47EF648A8E2893D5F021BB","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS010Fqq0grOZtrkILAFV9q4CAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAJhIXtSJ1bLSX7NholjTlMi9LDzAmZataO+EiDqKjOTcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb7Og6waGVzfa6j5nfubCnwFtLmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '7b8af3c401402066c499fbfe194aeefc1ed974347cfd60b599daa3e70223a6a39a59fda4a01f5a09b348733a129a6bdb8df7db8759bd5e78466e5625a5a0cddb23c973aa68b47414dcd0488b3cc757fdc74bb2bf47a007f7479fd34434ecdbbfb90adfa8e6c041612dab3eb56773a21e81457807930448ea580baae3874ecf5db8738e46b7a2a09002a23ef5fa5972d570ecc630a3ddbe600a0e3e1bd9efbcf3693ac954e55528546d9ca27597f4cafb5560395834b83ea3ded5904a5e81bc1619f66f807795955b164ba62e12db2d1b878758ca3abfa018d739ef1e073c0e47901968f0783ba236cbb8cac0e412151019e37184aa29ab8afea9857f52c7c112',
    '0xb57900849556ae1e7b5683fc33478c7ab9bf5eb60e70305f3552bb48cc78ca6c',
  ],
  [
    '0xbe49a926dc3e39173d85c80b87b78cd3971cb16f',
    '{"id":"77069474400630205951110534985605876781","timestamp":"2019-03-19T22:41:23.556960","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF22A0E67619A490EC4376AE9FB220DCB4E8BE2E47F35C96D2B41728FE84E8DE6A5C050F1233CCF1DB96130C0BA70A1391F6E92A7BAD48985EFF1A2A72DD6A8B1FA","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS1HIL5jpEFhll9zdVEY2eITCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAADWIYYQsfg3MzWzYuKh/4TiP6TcSnGAuUDpvB0cE5i8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+Sakm3D45Fz2FyAuHt4zTlxyxbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '87cef4906cfda88231a8ede1d63becd14691801ada3c3faef282f84cf04a329cd215114f7bd71193923366984d1554bfa27070fee38d5feb4d539da5dc731f9505922d0f602b3e70026d93a8d2ca87365f5a1f9f04cb8816a9968b9e9dc7689edfb6686c89569f6834dbd0691fa78ef1b0bc787fbc46aa43a469820af3a386f34795352eaa7dcfd197f2e8dcd64ff4432ae4c26e839edb1722e3ae28101b37df005cab805e6d4b83b24d0ed3f20ab58d453500a3ac60987aa86d962db811cf7a13852e13add303f6d38b2f843bfe7faaedb7cb9409e7e372b3f12d236b238833e9a8840dd9a5474a30a33e4f11f9981855f929aba9ac0d5c38c0d947796152aa',
    '0x0403e5b12280f28110712a4bfc46b98074fbad137b89c20d24f8a1fff3bd65a9',
  ],
  [
    '0x903cd5c2a29f6c319f58c7f9c6ad6903a13660e2',
    '{"id":"153323716193349733143745511909022402328","timestamp":"2019-03-19T22:43:22.490983","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF2C0084C576CAEE52930CB91310270751590DCFECD75B0DF2BDF3C269867F6E659FA5878DBA26A62873898F92D1A6E7289A86083600B08E21036C40C1F9437F6AB","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS3lvQCPYv6DQyjUsd1uPessCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAALS1O1QDSh5Km4rNw4hxaCekHTayCqiHgfeuMk63sYEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQPNXCop9sMZ9Yx/nGrWkDoTZg4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '01ebd6489e05e8697bff10067989600264248eba2649cdf0fd84794aacdefbb9bd4d39780c6722c5b560916c5e2c86adce99a1b6e8452a7c9940eb6260dbf29c382ab2148f9d99663b6f15df4375f9ffc56aab5553ebc46f37d5a973db6ca1018c12497e3fc719d29d3b0b3eb9a8a888eb31e8aa1a914e75490e09496017a73d4db8bc3faf693a845f989f0dc9e87e07682577d89aa7f9c7f57daaf9cc1b2a01bde204a21280ff0e01672b1bca78c0fc01f46eb43ca3956aee9f0d3b56418e2c641532ae7879465d97ac6aaf6b99ee4d19b8d99c89058f7fdd60b36a505d9fb73e8b19ac1268514ac85e918a453996ed35aecc84aca2e9b989f72d4af6bfb9cf',
    '0xcec7dc4f6ae246a110b5017be6d61c999c683a9797bfabc2ed2dd467656394d2',
  ],
  [
    '0x8f7bfd7185add79c44e45be3bf1f72238ef5b320',
    '{"id":"273240551737381751133113783365150975709","timestamp":"2019-03-19T22:44:47.980749","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF28C39FE233090F6E6FD90067996F8E859003A4ADCECC74749FAF80A1AF276762027919659F57C7BD58B0562D3BDBFEC113C6179964153989D27F5823F7DD1904B","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS2B3sMbNQp+E/UrWIqC5kmSCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAB1Af1ckUsmTeNf0JlKRzBav0J2rxZTisXfs4AmAKjkyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACPe/1xha3XnETkW+O/H3IjjvWzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '40310062df53d9d07740bc1893a7341480b9c999de53e683c0d3950d2abdb9b80bb4101d245d5d91f8f575ff78197b1ec42d043367554f231981f4cd94b4ebafa6a0d5024ef8547f3f215c3e4cd10c6bbf2ce34c1b475199fae6c8a0e784d94dd5a0028dc2c06babae5a7b63680a091de4187218db4865ec4a95b73e209d9a31c7c357ce44fdd0432389603ca5e70f8da0568189fada94d4017613e6453a5c685b385b7e2e84f22a9477684e74494a0d64d4d78124cccd8b1a7e92e9372e33043637d72f47c78c57fcef4262f510457d1a1e457cbb7507f88d6945af7b3b27cc96f6b0ec78661ac4a86f5bada215e3d06207d421c4c9e022c02b624a0a02ea54',
    '0x303a0a2c8b00a98902f145e7c9c7b671916e8755a075ca328279cbe9603d7569',
  ],
  [
    '0xfead1eb428bf84b61ccbaadb2d3e003e968c2847',
    '{"id":"57945051993245420335133142183194165594","timestamp":"2019-03-19T22:46:19.105515","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF2805B4548F6917F6E2D3D32BAC56F396E86783C7B7CD07BA32CCD2064C2904E706CF82FFA77FA5B461F2DC5B49DF09A488547A61B2AC3578A1B413C9B76935747","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS3eJNG4ZV4GWwWxdOEOzN5kCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAO/rQ/VQtDy2JMLhsrspc73TUutg4kSN3EeXK/32dYtKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+rR60KL+EthzLqtstPgA+lowoRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '047c0add784671be53ea8f813059531feeabf1c30f2bc36ea0069b27eec1bdd8d298988da377acfd61bd288a1d62c78006cb0135ff79396c393b70cf3623b244b8b39ff3820b40ad20955d2db9e193ecf49cd52d5118a22f6a03b99d5176413d38ca03652a1ae4a1974b81856b535eb588c906e4c7aa4850a34d40024acb695cb3386dd0ce67b8f5201e63e428591947789f6ff0fcb205f9e0def8624371feea1e2cbcee5340c7170095cc7a942da558e122eec83bdc7d72a3483a912cf65490b23a1f8bb14044e48e58c9a28b3666355eea919052e3c66ac7c5003a9f40fe93334eb1075febc5782a29e4d92ae7a1a2e234699bc92f71950f23a2b3a1cbe206',
    '0x1e936751f309c8e4c272e42b83bff7f448337e0522764b410a1beb98fc324d78',
  ],
  [
    '0xfc78b66f1385d47eedb90c7b66f2adc34ae41827',
    '{"id":"57177421152809729487883164040119804084","timestamp":"2019-03-19T22:47:31.988591","isvEnclaveQuoteStatus":"GROUP_OUT_OF_DATE","platformInfoBlob":"1502006504000600000808020401010000000000000000000008000009000000020000000000000AF222734A596F49A6D004DEF547FFFF5A3C6EE7EEF91D92C7C1879DD8E4F61E47A2BA539653A89CE847FC3AB9F7071E4A7CA59DEEFD869632EE243C843032C5CB8F","isvEnclaveQuoteBody":"AgAAAPIKAAAHAAYAAAAAALAzX9O8HMqPgE65imQgWS3pUzfkmX2BI/ra896T2FSSCAgCBAECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAHAAAAAAAAAAqPbFyD5tazvoPN3+rhJyRMdIP5PjXbkVHPRKFcmbpzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD1xnnferKFHD2uvYqTXdDA8iZ22kCD5xw7h38CMfOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8eLZvE4XUfu25DHtm8q3DSuQYJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}',
    CERT,
    '4cf880460e5b9175a6abaf99ff5df6a3ccd1733ee04af61a3132992ccd99170ff9aedcdbc2658e941864bbec7cf3df5d9eb87140c858ae3970ee959be095da89b85794573d84145e242f7c8748b98afeac8b95f464db2706e87845ef316171eedadb211f05d53f78f3dfac6b8b758e6611b69ba1fca8ac80a5ca5cf97401d56403c6eb7802aaa7a224bf9696989d55ed034c460bf7c2587f29ded827d814245b44110e62854dc525d8a1d22fc4ca5c353f82d34b81a3242d2142958c4d7402eac41c5cd0ac4643611e6287754e2fc3a55cf33e036504da5ba1ada01bdf1439ac2b37dc5e29a8b01e18079b05b4e2eb9359e264512e7da6870719e2178eac4ab8',
    '0xe7ead050fac60ccd567e5c00c78995399745cbcee9657cab1f5f5027feed8f25',
  ],
];

exports.callable = 'mixAddresses(uint32,address[],uint256)';
exports.callback = 'distribute(uint32,address[])';
exports.args = [
  0, [
    '01dd68b96c0a3704f006e419425aca9bcddc5704e3595c29750014733bf756e966debc595a44fa6' +
    'f83a40e62292c1bbaf610a7935e8a04b3370d64728737dca24dce8f20d995239d86af034ccf3261' +
    'f97b8137b972',
    '01dd68b96c0a3704f006e419425aca9bcddc5704e3595c29750014733bf756e966debc595a44fa6' +
    'f83a40e62292c1bbaf610a7935e8a04b3370d64728737dca24dce8f20d995239d86af034ccf3261' +
    'f97b8137b972',
  ],
];
