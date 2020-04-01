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
    hash character varying
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

COPY public.transaction_log (trans_log_id, sender_trans_type_fk, receiver_trans_type_fk, sender_price, receiver_price, is_successful, hash) FROM stdin;
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

COPY public.user_account (user_account_id, account_type_fk, username, userpassword, is_active, create_date) FROM stdin;
1	2	test-seller	test-seller	t	2019-11-18 22:28:55.095932
2	\N	testtest	testtest	t	2020-02-24 16:47:59.186
3	\N	test	testtest	t	2020-03-25 20:22:29.046
\.


--
-- Data for Name: user_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_transaction (user_trans_id, user_account_fk, trans_type_fk, wallet_address, is_primary) FROM stdin;
1	1	1	miaRyqZqPAUTyoPrrd9zXdr8CXhpgjL71J	f
4	1	2	nejaka penazenka ftw!!!???	f
10	1	3	jebat	t
\.


--
-- Name: account_type_account_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_type_account_type_id_seq', 1, false);


--
-- Name: transaction_log_trans_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_log_trans_log_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.user_transaction_user_trans_id_seq', 10, true);


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

