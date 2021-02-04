<script>
	// import successkid from 'images/successkid.jpg';
	import io from 'socket.io-client';
	import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
	import { truncate } from '../utils'
	var socket = io();
	socket.on('connect', () => {
		console.log("frontend conencted");
	});
	let transactions = [JSON.parse(`{
  "Hash": "0x2f7412aabfd4ebb57a1e3d37fbd3fe48f7289bdd244008190b5ffd7db2862fac",
  "From": "0xcf45462a9e32c0b80cc0582240eaecee53a21616",
  "To": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
  "Data": "38ED1739000000000000000000000000000000000000000000000000C20859C9792C9E600000000000000000000000000000000000000000000000000DA339B4D752C9F000000000000000000000000000000000000000000000000000000000000000A0000000000000000000000000CF45462A9E32C0B80CC0582240EAECEE53A2161600000000000000000000000000000000000000000000000000000000601B63C000000000000000000000000000000000000000000000000000000000000000030000000000000000000000006C4B85CAB20C13AF72766025F0E17E0FE558A553000000000000000000000000C02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2000000000000000000000000B1DC9124C395C1E97773AB855D66E879F053A289",
  "EthTouchedNode": [
    {
      "UnixTimeStamp": 1612472961,
      "NodeIp": "47.186.108.211"
    }
  ],
  "GasPrice": "88000000000",
  "Nonce": "15",
  "GasLimit": "216585",
  "Value": "123123"
}`)];


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