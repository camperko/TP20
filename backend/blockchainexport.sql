--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_type (
    account_type_id integer NOT NULL,
    account_type character varying
);


ALTER TABLE public.account_type OWNER TO postgres;

--
-- Name: account_type_account_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_type_account_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_type_account_type_id_seq OWNER TO postgres;

--
-- Name: account_type_account_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_type_account_type_id_seq OWNED BY public.account_type.account_type_id;


--
-- Name: transaction_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_log (
    trans_log_id integer NOT NULL,
    sender_trans_type_fk integer,
    receiver_trans_type_fk integer,
    sender_price numeric,
    receiver_price numeric,
    is_successful boolean,
    hash character varying,
    user_account_id_fk integer,
    "timestamp" timestamp without time zone,
    order_id integer
);


ALTER TABLE public.transaction_log OWNER TO postgres;

--
-- Name: transaction_log_trans_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_log_trans_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_log_trans_log_id_seq OWNER TO postgres;

--
-- Name: transaction_log_trans_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_log_trans_log_id_seq OWNED BY public.transaction_log.trans_log_id;


--
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type (
    trans_type_id integer NOT NULL,
    type_name character varying,
    type_display character varying,
    is_active boolean,
    create_date timestamp without time zone,
    trans_fee numeric,
    url character varying,
    currency character varying
);


ALTER TABLE public.transaction_type OWNER TO postgres;

--
-- Name: transaction_type_field; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type_field (
    trans_type_field_id integer NOT NULL,
    trans_type_fk integer,
    field_name character varying,
    field_display character varying,
    is_active boolean,
    create_date timestamp without time zone,
    validators character varying,
    is_required boolean,
    field_order integer
);


ALTER TABLE public.transaction_type_field OWNER TO postgres;

--
-- Name: transaction_type_field_trans_type_field_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_type_field_trans_type_field_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_type_field_trans_type_field_id_seq OWNER TO postgres;

--
-- Name: transaction_type_field_trans_type_field_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_type_field_trans_type_field_id_seq OWNED BY public.transaction_type_field.trans_type_field_id;


--
-- Name: transaction_type_trans_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_type_trans_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_type_trans_type_id_seq OWNER TO postgres;

--
-- Name: transaction_type_trans_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_type_trans_type_id_seq OWNED BY public.transaction_type.trans_type_id;


--
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_account (
    user_account_id integer NOT NULL,
    account_type_fk integer,
    username character varying,
    userpassword character varying,
    is_active boolean,
    email character varying,
    create_date timestamp without time zone
);


ALTER TABLE public.user_account OWNER TO postgres;

--
-- Name: user_account_user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_account_user_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_account_user_account_id_seq OWNER TO postgres;

--
-- Name: user_account_user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_account_user_account_id_seq OWNED BY public.user_account.user_account_id;


--
-- Name: user_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_transaction (
    user_trans_id integer NOT NULL,
    user_account_fk integer,
    trans_type_fk integer,
    wallet_address character varying,
    is_primary boolean
);


ALTER TABLE public.user_transaction OWNER TO postgres;

--
-- Name: user_transaction_user_trans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_transaction_user_trans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_transaction_user_trans_id_seq OWNER TO postgres;

--
-- Name: user_transaction_user_trans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_transaction_user_trans_id_seq OWNED BY public.user_transaction.user_trans_id;


--
-- Name: account_type account_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_type ALTER COLUMN account_type_id SET DEFAULT nextval('public.account_type_account_type_id_seq'::regclass);


--
-- Name: transaction_log trans_log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log ALTER COLUMN trans_log_id SET DEFAULT nextval('public.transaction_log_trans_log_id_seq'::regclass);


--
-- Name: transaction_type trans_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type ALTER COLUMN trans_type_id SET DEFAULT nextval('public.transaction_type_trans_type_id_seq'::regclass);


--
-- Name: transaction_type_field trans_type_field_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type_field ALTER COLUMN trans_type_field_id SET DEFAULT nextval('public.transaction_type_field_trans_type_field_id_seq'::regclass);


--
-- Name: user_account user_account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account ALTER COLUMN user_account_id SET DEFAULT nextval('public.user_account_user_account_id_seq'::regclass);


--
-- Name: user_transaction user_trans_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_transaction ALTER COLUMN user_trans_id SET DEFAULT nextval('public.user_transaction_user_trans_id_seq'::regclass);


--
-- Data for Name: account_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_type (account_type_id, account_type) FROM stdin;
1	admin
2	seller
\.


--
-- Data for Name: transaction_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_log (trans_log_id, sender_trans_type_fk, receiver_trans_type_fk, sender_price, receiver_price, is_successful, hash, user_account_id_fk, "timestamp", order_id) FROM stdin;
1	1	2	0.123	0.456	t	asdfghjk	1	2004-10-19 10:23:54.12345	\N
2	1	3	0.0099	0.5	f	kjhgfds	1	2020-03-03 10:10:02.12345	\N
3	1	3	0.354	0.96	t	sdfg	1	2020-03-13 18:18:32.12345	\N
4	1	3	0.006	0.00001	t	uhygtfre	1	2020-02-03 17:10:52.12345	\N
5	1	4	1.558	0.25	f	tg	1	2020-03-05 00:00:56.12345	\N
6	1	5	10.86	5.32	f	oiuyt	1	2019-12-10 06:08:43.12345	\N
8	1	1	1.0	2.0	t	somehash	1	2020-03-28 19:07:03.026247	\N
9	1	1	0.00001358	0.00001004	t	f95b6a1c4d592826eefcd8479280d9b6f0897c80c719c0296e02e97f6b45fb8b	\N	2020-03-30 22:42:17.22329	\N
10	1	1	1.0	2.0	t	somehash	1	2020-03-30 23:57:54.932629	\N
11	1	1	0.00001337	0.00001004	t	8e92dac791962ba832079373d7f97a58a6a38c9f9143e33fc09c3c1f0c9f94e4	1	2020-03-31 00:10:37.124816	\N
12	1	1	0.0000134	0.00001004	t	f44834cba7fee20466bdf7ed47a1a6a4659892658b65977b1d874574fd10a827	1	2020-03-31 00:18:18.490736	7
13	1	1	0.000013880000000000001	0.00001023	t	da2bea6aba3702e4f9e1b6617de03a62cb80880e1fde7a40347e5c485ca2698a	1	2020-03-31 00:30:41.131125	8
14	1	1	0.000014439999999999999	0.00001123	t	ddeedf8d5a791db826b02d6d791894d262739edf48d2c59e7a4b6f1d949a123d	1	2020-03-31 00:41:32.282069	123
15	1	1	0.000013000000000000001	0.00001000	t	9e025033904498fe5e4dd5331a4e97f0dc8e7926f4c4954de0485da193e23324	1	2020-04-01 20:44:56.713189	500
16	1	1	0.000014000000000000001	0.00001000	t	c4c3e3a665a70e18480bed4641a994597608bc981c5fed217e32109cd105912e	1	2020-04-01 20:56:20.282912	503
17	1	1	0.00001444	0.00001000	f	\N	1	2020-04-01 20:56:44.22367	504
18	1	1	0.00001444	0.00001000	f	\N	1	2020-04-01 20:59:19.016287	504
19	1	1	10000.000004989999	9999.99999999	f	\N	1	2020-04-01 21:08:04.622319	505
20	1	1	10000.00000498	9999.99999998	f	\N	1	2020-04-01 21:09:14.945305	506
21	1	1	10000.00000497	9999.99999997	f	\N	1	2020-04-01 21:12:19.036906	506
7	1	5	10.1010	5.555	t	sdfghj	3	2020-03-03 10:11:01.12345	\N
\.


--
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (trans_type_id, type_name, type_display, is_active, create_date, trans_fee, url, currency) FROM stdin;
1	BTC	Bitcoin	t	2019-11-18 22:28:55.095932	0.0002	https://btc.com/	BTC
2	ETH	Ethereum	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	ETH
3	LTC	Litecoin	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	LTC
4	ETC	Ethereum Classic	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	ETC
5	BCH	Bitcoin Cash	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	BCH
6	DOGE	Dogecoin	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	DOGE
7	DASH	Dash	t	2019-11-18 22:28:55.095932	0.0002	https://google.com/	DASH
\.


--
-- Data for Name: transaction_type_field; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type_field (trans_type_field_id, trans_type_fk, field_name, field_display, is_active, create_date, validators, is_required, field_order) FROM stdin;
1	1	address	BTC - Address	t	2019-11-18 22:28:55.095141	\N	t	1
2	1	wif	BTC - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
3	2	address	ETH - Address	t	2019-11-18 22:28:55.095141	\N	t	1
4	2	wif	ETH - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
5	3	address	LTC - Address	t	2019-11-18 22:28:55.095141	\N	t	1
6	3	wif	LTC - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
7	4	address	ETC - Address	t	2019-11-18 22:28:55.095141	\N	t	1
8	4	wif	ETC - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
9	5	address	BCH - Address	t	2019-11-18 22:28:55.095141	\N	t	1
10	5	wif	BCH - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
11	6	address	DOGE - Address	t	2019-11-18 22:28:55.095141	\N	t	1
12	6	wif	DOGE - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
13	7	address	DASH - Address	t	2019-11-18 22:28:55.095141	\N	t	1
14	7	wif	DASH - WIF	t	2019-11-18 22:28:55.095141	\N	t	2
\.


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_account (user_account_id, account_type_fk, username, userpassword, is_active, email, create_date) FROM stdin;
1	2	test	$2b$10$bd0T9loE0u7dGTzKDk310evmYoSPhx0RKWwW522OgLq5/K.1w5KlG	t	newTest@mail.com	2020-04-01 21:03:54.396
3	2	veron	$2b$10$BdqSNyt2AMSDohSf.bM9d.0oZsQl5uflvomUOhx7pFjZX46CgM4rK	t	veron@mail.com	2020-04-04 16:29:24.961
\.


--
-- Data for Name: user_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_transaction (user_trans_id, user_account_fk, trans_type_fk, wallet_address, is_primary) FROM stdin;
5	1	1	miaRyqZqPAUTyoPrrd9zXdr8CXhpgjL71J	f
6	1	3	asdfghjkl	f
7	1	2	zsxdfghjk	t
\.


--
-- Name: account_type_account_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_type_account_type_id_seq', 1, false);


--
-- Name: transaction_log_trans_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_log_trans_log_id_seq', 21, true);


--
-- Name: transaction_type_field_trans_type_field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_field_trans_type_field_id_seq', 1, false);


--
-- Name: transaction_type_trans_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_trans_type_id_seq', 1, true);


--
-- Name: user_account_user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_account_user_account_id_seq', 3, true);


--
-- Name: user_transaction_user_trans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_transaction_user_trans_id_seq', 7, true);


--
-- Name: account_type account_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_type
    ADD CONSTRAINT account_type_pkey PRIMARY KEY (account_type_id);


--
-- Name: transaction_log transaction_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT transaction_log_pkey PRIMARY KEY (trans_log_id);


--
-- Name: transaction_type_field transaction_type_field_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type_field
    ADD CONSTRAINT transaction_type_field_pkey PRIMARY KEY (trans_type_field_id);


--
-- Name: transaction_type transaction_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pkey PRIMARY KEY (trans_type_id);


--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (user_account_id);


--
-- Name: user_transaction user_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_transaction
    ADD CONSTRAINT user_transaction_pkey PRIMARY KEY (user_trans_id);


--
-- Name: transaction_log transaction_log_receiver_trans_type_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT transaction_log_receiver_trans_type_fk_fkey FOREIGN KEY (receiver_trans_type_fk) REFERENCES public.transaction_type(trans_type_id) ON DELETE CASCADE;


--
-- Name: transaction_log transaction_log_sender_trans_type_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT transaction_log_sender_trans_type_fk_fkey FOREIGN KEY (sender_trans_type_fk) REFERENCES public.transaction_type(trans_type_id) ON DELETE CASCADE;


--
-- Name: transaction_type_field transaction_type_field_trans_type_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type_field
    ADD CONSTRAINT transaction_type_field_trans_type_fk_fkey FOREIGN KEY (trans_type_fk) REFERENCES public.transaction_type(trans_type_id) ON DELETE CASCADE;


--
-- Name: user_account user_account_account_type_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_account_type_fk_fkey FOREIGN KEY (account_type_fk) REFERENCES public.account_type(account_type_id) ON DELETE CASCADE;


--
-- Name: user_transaction user_transaction_trans_type_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_transaction
    ADD CONSTRAINT user_transaction_trans_type_fk_fkey FOREIGN KEY (trans_type_fk) REFERENCES public.transaction_type(trans_type_id) ON DELETE CASCADE;


--
-- Name: user_transaction user_transaction_user_account_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_transaction
    ADD CONSTRAINT user_transaction_user_account_fk_fkey FOREIGN KEY (user_account_fk) REFERENCES public.user_account(user_account_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

