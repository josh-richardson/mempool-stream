<script>
	// import successkid from 'images/successkid.jpg';
	import io from 'socket.io-client';
	import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
	import { truncate } from '../utils'
	var socket = io();
	socket.on('connect', () => {
		console.log("frontend conencted");
	});
	let transactions = [];

	socket.on('datachanged', (time) => {
		
	});

	socket.on('tx', (tx) => {
		transactions = [...transactions, tx]
		console.log(tx);
	})

	let width;
	let trunc = 60;
	$: trunc = width / 35;
</script>

<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.table-outer {
		display: flex;
		flex-direction: column;
	align-items: center;
	}
</style>

<svelte:head>
	<title>Mempool Stream</title>
</svelte:head>

<h1>The mempool!</h1>
<p>Streamed to you over a websocket...</p>
<svelte:window bind:innerWidth={width}/>

<div class="table-outer">
	
	<DataTable table$aria-label="People list" table$class="table-center">
		<Head>
		<Row>
			<Cell>Hash</Cell>
			<Cell>From</Cell>
			<Cell>To</Cell>
			<Cell>Value</Cell>
			<Cell>Details</Cell>
		</Row>
		</Head>
		<Body>

	{#each transactions as tx}
		<Row>

			<Cell><a href="https://etherscan.io/tx/{tx.Hash}" target="_blank">{truncate(tx.Hash, trunc)}</a></Cell>
			<Cell>{truncate(tx.From, trunc)}</Cell>
			<Cell>{truncate(tx.To, trunc)}</Cell>
			<Cell>{tx.Value}</Cell>
			<Cell><a href="#$">View Details</a></Cell>
			
		</Row>
	{/each}
		</Body>
</DataTable>


</div>