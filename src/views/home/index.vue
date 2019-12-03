<script>
export default {
  name: 'authredirect',
  created() {
    console.log()
    const hash = window.location.search.slice(1)
    window.opener.location.href = window.location.origin + '/start#' + hash
    window.close()
  }
}
</script>